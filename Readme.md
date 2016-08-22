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

