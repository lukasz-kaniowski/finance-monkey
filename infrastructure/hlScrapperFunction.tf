resource "aws_iam_policy" "access_dynamodb" {
  name = "finance-monkey_access_dynamodb"
  path = "/"
  description = "Access to dynomodb"
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Scan"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
POLICY
}

resource "aws_iam_policy" "logs" {
  name = "finance-monkey_logs"
  path = "/"
  description = "Access to logs"
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "logs:*"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
POLICY
}

resource "aws_iam_role" "finance-monkey-hlScrapper-role" {
  name = "finance-monkey-hlScrapper-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy_attachment" "finance-monkey-access_dynamodb" {
  name = "finance-monkey-access_dynamodb"
  roles = [
    "${aws_iam_role.finance-monkey-hlScrapper-role.name}"
  ]
  policy_arn = "${aws_iam_policy.access_dynamodb.arn}"
}

resource "aws_iam_policy_attachment" "finance-monkey-logs" {
  name = "finance-monkey-logs"
  roles = [
    "${aws_iam_role.finance-monkey-hlScrapper-role.name}"
  ]
  policy_arn = "${aws_iam_policy.logs.arn}"
}

resource "aws_iam_role" "finance-monkey_simple-lambda" {
  name = "finance-monkey_simple-lambda"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "finance-monkey-AWSLambdaBasicExecutionRole" {
  role = "${aws_iam_role.finance-monkey_simple-lambda.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "finance-monkey-AWSLambdaRole" {
  role = "${aws_iam_role.finance-monkey_simple-lambda.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaRole"
}

resource "aws_dynamodb_table" "finance-monkey" {
  name = "finance-monkey"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"
  attribute {
    name = "id"
    type = "S"
  }
}

// this is passed by apex http://apex.run/#terraform-variables
variable "apex_function_hlScrapper" {}

variable "apex_function_hlScrapper_name" {
  default = "finance-monkey_hlScrapper"
}

resource "aws_cloudwatch_event_rule" "every_day" {
  name = "every_day"
  description = "Fires every day"
  schedule_expression = "rate(1 day)"
}

resource "aws_cloudwatch_event_target" "finance-monkey_hlScrapper_every_five_minutes" {
  rule = "${aws_cloudwatch_event_rule.every_day.name}"
  target_id = "${var.apex_function_hlScrapper_name}"
  arn = "${var.apex_function_hlScrapper}"
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_finance-monkey_hlScrapper" {
  statement_id = "AllowExecutionFromCloudWatch"
  action = "lambda:InvokeFunction"
  function_name = "${var.apex_function_hlScrapper_name}"
  principal = "events.amazonaws.com"
  source_arn = "${aws_cloudwatch_event_rule.every_day.arn}"
}
