[![Build Status](https://travis-ci.org/lukasz-kaniowski/finance-monkey.svg?branch=master)](https://travis-ci.org/lukasz-kaniowski/finance-monkey)

## Infrastructure

Apex is using terraform under the cover. 

    $ apex infra plan
    $ apex infra apply

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

    $ docker run -d -p 8000:8000 dwmkerr/dynamodb
    
Run tests
    
    $ npm test

[dynamodb local]: https://aws.amazon.com/blogs/aws/dynamodb-local-for-desktop-development/
