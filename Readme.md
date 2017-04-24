[![Build Status](https://travis-ci.org/lukasz-kaniowski/finance-monkey.svg?branch=master)](https://travis-ci.org/lukasz-kaniowski/finance-monkey)
aa
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

## Alexa

Alexa lambda function requires *Alexa Skills Kit* trigger to be added. 
This need to be done manually on aws console. 
 
In [amazon developer console] configure alexa skill

1. Point to alexa lambda function 
2. Copy intent
```json
{
  "intents": [
    {
      "intent": "portfolio"
    }
  ]
}  
```
3. Copy utterances, ie.
```text
portfolio today
portfolio about today
portfolio about status
portfolio status
```

 
[amazon developer console]: https://developer.amazon.com
[dynamodb local]: https://aws.amazon.com/blogs/aws/dynamodb-local-for-desktop-development/
