The assignment application contains two modules which are server REST service and client UI. Both of them have been deployed onto Heroku server and can be access via two URLs below:
  - http://full-stack-dev-server.herokuapp.com/rest for REST services server
  - http://full-stack-dev-client.herokuapp.com/home for client UI

# Technologies
  - Back-end frameworks and libraries
     + Springboot
     + Spring Data Rest
     + Spring security
     + Lombok
     + Database postgres
  - Front-end frameworks and libraries
     + Angularjs
     + Core-Dandelion (handles static and dynamic web assets such as JavaScript or CSS)
     + Bootstrap
     + Perfect scroll bar
     + Lodash for angular
     + Webjars

# Build and deployment
  - The source code is built and run on Java 7.
  - To run source code on local computer, follow these steps
    + Create PostgreSQL data base schema using **postgres-db-schema.sql** (located in script folder of server module)
    + Configure run/debug with JVM options -Dspring.profiles.active=dev to active the dev mode.
    + Tomcat ports are set to 18080 for client and 18181 for server modules. To change them, modify the application.yml file.
  - To deploy source code onto Heroku, follows these steps
    + Create two applications on Heroku, each corresponding to the server and client modules.
    + Create database schema for server app by executing the **postgres-db-schema.sql**.
    + Deploy server app by master branch.
    + Deploy client app by full-stack-client branch. The full-stack-client branch contain only one difference with master branch in proc file, which is modified to be able to deploy the client module.

# Security
The server module is protected with basic authentication of Spring security. The client will then communicate with the server (indifferent domain name) through cookie-based authentication,
however Spring security prevent cross site attack by not allow saving, reading cookie from another origin.
To make the app simple for demonstration of the basic authentication, these security features below have been set in server module.
  - Allowed for any CORS (Cross-Origin Resource Sharing) request.
  - Disable CSRF (Cross-Site Request Forgery) prevention attack.
  - Remove HTTP-ONLY header on cross site response to save cookies into different origin.

In practice development, those securities should be implemented (enable, disable) properly to prevent from cross site security attack.

Cookie-based authentication/authorization can be replaced by token-based authentication/authorization. SSO (Single Sign-On) with OAuth2 is a popular option recently on world wide web.
Spring provided the Spring Security OAuth to support that.

# REST Usages
Because the server module uses basic authorization for protecting resources, remember to specify username/password as **admin/admin** when making any request to REST services

### Call to REST services on server
 - Create a new company POST http://full-stack-dev-server.herokuapp.com/rest/companies along with company data to be created in JSON format. For example:

        curl -X POST -H "Content-Type: application/json" -u admin:admin -d '{
		        "id"      : 6,
		        "name"    : "A new company",
		        "address" : "Vietnam",
		        "city"    : "Danang",
		        "country" : "Vietnam",
		        "email"   : "namonlyone@gmail.com",
		        "phone"   : "01686088636"
        } ' http://full-stack-dev-server.herokuapp.com/rest/companies



 - Get a list of all companies GET http://full-stack-dev-server.herokuapp.com/rest/companies/search/offset{?offset,limit,sort}. Pagination params as following:
   + offset: the page number
   + limit: the number of results of a page
   + sort: sort results in synctax sort=property,[asc/desc]

    For example:

        curl -u admin:admin http://full-stack-dev-server.herokuapp.com/rest/companies/search/offset?offset=0&limit=10&sort=name,asc

 - Get details about a company GET  http://full-stack-dev-server.herokuapp.com/rest/companies/{companyId}. For example to get information of company with id 1:
 -
        curl -u admin:admin http://full-stack-dev-server.herokuapp.com/rest/companies/1

 - Update a company PATCH http://full-stack-dev-server.herokuapp.com/rest/companies/{companyId} with company data to be updated in JSON format. For example to update the company with id = 1:

        curl -X PATCH -H "Content-Type: application/json" -u admin:admin -d '{
                "name" : "A new company with update name",
        		"address" : "Vietnam",
        		"city" : "Danang",
        		"country" : "Vietnam",
        } ' http://full-stack-dev-server.herokuapp.com/rest/companies/1

 - Create new beneficial owner POST http://full-stack-dev-server.herokuapp.com/rest/owners and specify data of owner to be created in JSON format. For example:

        curl -X POST -H "Content-Type: application/json" -u admin:admin -d '{
            "name" : "A new owner",
        } ' http://full-stack-dev-server.herokuapp.com/rest/owners

 - Add beneficial owner(s) of company POST to http://full-stack-dev-server.herokuapp.com/rest/owners and specify the array of pairs CompanyID-OwnerId to be added in JSON format. For example:

        curl -X POST -H "Content-Type: application/json" -u admin:admin -d '[
            {"companyId":6,"ownerId":11},
            {"companyId":6,"ownerId":10}
        ]' http://full-stack-dev-server.herokuapp.com/rest/ownerCompanies

### Client UI usages
  - Access http://full-stack-dev-client.herokuapp.com/home to open the deployed client UI on Heroku.
  - On the UI, connect to REST server using these information below:
    + REST server host: **http://full-stack-dev-server.herokuapp.com**
    + Username: admin
    + Password: admin
  - The client will connects to REST server through the host and authenticate by the provided credential.