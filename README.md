The assignment application contains two modules which are server REST service and client UI. Both of them have been deployed onto Heroku server and can be access via two URLs below:
  - http://full-stack-dev-server.herokuapp.com/ for REST services server
  - http://full-stack-dev-client.herokuapp.com/home for client UI

# Technologies
  - Back-end frameworks and libraries
     + Springboot
     + Spring Data Rest which is a project of Spring framework build hypermedia-driven REST web services on top of Spring Data repositories.
     + Spring security
     + Lombok
     + Database postgres
  - Front-end frameworks and libraries
     + Angularjs
     + Core-Dandelion handles static and dynamic web assets such as JavaScript or CSS 
     + Bootstrap
     + Perfect scroll bar
     + Lodash for angular
     + Webjars
      
# Source code and deployment
  - Require Java 7 to build and run.
  - User PGAdmin to execute postgres-db-schema.sql located in modul server to create the whole data base schema.
  - Add -Dspring.profiles.active=dev to JVM options to run and debug in local machine.

# REST Usages
The server use basic authorization for protecting resources, remember to specify username/password as **admin/admin** when making any request to REST services

### Call to REST services on server
Create a new company POST http://full-stack-dev-server.herokuapp.com/rest/companies a long with company data to be created in JSON format. For example:
```sh
curl -X POST -H "Content-Type: application/json" -u admin:admin -d '{ 						
		"id" : 6, 						
		"name" : "A new company", 		
		"address" : "Vietnam", 			
		"city" : "Danang", 				
		"country" : "Vietnam",			
		"email" : "namonlyone@gmail.com", 
		"phone" : "01686088636"
} ' http://full-stack-dev-server.herokuapp.com/rest/companies
```
Get a list of all companies GET http://full-stack-dev-server.herokuapp.com/rest/companies/search/offset{?offset,limit,sort}. Pagination params as following:
  - offset: the page number
  - limit: the number of results of a page
  - sort: sort results in synctax sort=property,[asc/desc]
   
For example:
```sh
curl -u admin:admin http://full-stack-dev-server.herokuapp.com/rest/companies/search/offset?offset=0&limit=10&sort=name,asc
```

Get details about a company GET http://full-stack-dev-server.herokuapp.com/rest/companies/{companyId}. For example to get information of company with id 1:
```sh
curl -u admin:admin http://full-stack-dev-server.herokuapp.com/rest/companies/1
```

Update a company PATCH http://full-stack-dev-server.herokuapp.com/rest/companies/{companyId} with company data to be updated in JSON format. For example to update the company with id = 1:
```sh
curl -X PATCH -H "Content-Type: application/json" -u admin:admin -d '{
        "name" : "A new company with update name",
		"address" : "Vietnam", 			
		"city" : "Danang", 				
		"country" : "Vietnam",			
} ' http://full-stack-dev-server.herokuapp.com/rest/companies/1
```

Create new beneficial owner POST http://full-stack-dev-server.herokuapp.com/rest/owners and specify data of owner to be created in JSON format. For example:
```sh
curl -X POST -H "Content-Type: application/json" -u admin:admin -d '{
    "name" : "A new owner",
} ' http://full-stack-dev-server.herokuapp.com/rest/owners
```

Add beneficial owner(s) of company POST to http://full-stack-dev-server.herokuapp.com/rest/owners and specify the array of pairs CompanyID-OwnerId to be added in JSON format. For example:
```sh
curl -X POST -H "Content-Type: application/json" -u admin:admin -d '[
    {"companyId":6,"ownerId":11},
    {"companyId":6,"ownerId":10}
]' http://full-stack-dev-server.herokuapp.com/rest/ownerCompanies

