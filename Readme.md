[![Build Status](https://travis-ci.org/lukasz-kaniowski/finance-monkey.svg?branch=master)](https://travis-ci.org/lukasz-kaniowski/finance-monkey)

## Deploy

    $ ./build.sh
    $ apex deploy --env-file env.json
    
Where `env.json` should look like this:

    {
      "password": "your-password",
      "username": "your-username",
      "dob": "your-date-of-birth"
    }
    
To test if deployment was successful

    $ apex invoke hlScrapper
    $ apex logs
    
## Testing

Start [dynamodb local][dynamodb local]

    $ wget http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz -O /tmp/dynamodb_local_latest.tar.gz
    $ tar -xzf /tmp/dynamodb_local_latest.tar.gz -C /tmp
    $ java -Djava.library.path=/tmp/DynamoDBLocal_lib -jar /tmp/DynamoDBLocal.jar -inMemory &
    
Run tests
    
    $ npm test

[dynamodb local]: https://aws.amazon.com/blogs/aws/dynamodb-local-for-desktop-development/
