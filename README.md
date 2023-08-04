# legendary-doodle
Object-Relational Mapping (ORM): E-Commerce Back End

## Description
Internet retail is a popular way to shop. I want to provide a back end for an e-commerce website that uses the latest technologies so that the company can compete with other e-commerce companies. I was struggling to get the put Routes to work and display a visual confirmation of my change in the preview in insomnia. It would throw a 404 error on the put route, but when I checked the get route it was rendering the change. As you would see later, I was able to get over that hurdle. 


## Installation
* Have a code editor like VS Code
* Command Line like Git Bash
* Git Clone my Repo at https://github.com/abisinchan/legendary-doodle
* Install Insomnia https://docs.insomnia.rest/insomnia/install
* Install MySql & and Workbench https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide
* Install these dependencies in package json if installing by self choice
    * "dotenv": "^8.2.0",
    * "express": "^4.17.1",
    * "mysql2": "^2.1.0",
    * "sequelize": "^5.21.7"
* npm install to bring in libraries of dependencies
* Add credentials to .env  
  
Please have the required installions installed from above.  
After installations is complete, please go and clone my repo at my github link.  
Bring the code into your local computer  and open it in VS Code.  
Add your MySql credentials to .env 

## Start Up
Once everything is set in VS code, pull up your command line.    
Log into MySql shell by typing in **mysql -u root -p** in command line.   
Create your database by typing in **source db/schema.sql** in command line. (You can check in MySql workbench to see the database creation )    
Log out by typing quit in command line.    
Type in **node run seed** to seed test data in command line. (You can check in MySql workbench to see the seeded data)   
Type in **npm start** to run app in command line.   
You are now able to access the server from insomnia. 

## Tests
Make sure you are in debug mode in Insomnia.  
Create this structure and test your CRUD routes from the routes folder with correct endpoints.   
* Tag
    * Get for all
    * Get for one by tag id
    * Post to create new tag_name
    * Put to update tag_name
    * Delete by tag id  
  
Testing Json Data Sample:  
```
{
  "tag_name": "Testing Tag Name"
}
```

* Category
    * Get for all
    * Get for one by category id
    * Post to create new category_name
    * Put to update category_name
    * Delete by category id 
Testing Json Data Sample:  
```
{
  "category_name": "Testing Category"
}
```
* Post
    * Get for all
    * Get for one by product id
    * Post to create new product_name
    * Put to update product_name
    * Delete by product id
Testing Json Data Sample:  
```
{
"product_name": "Testing Product Name,
  "price": 550,
  "stock": 7,
  "category_id": 3,
  "tagIds": [2]
}
```


## ScreenShots
MySql Shell Log in, and Create  
![1](https://github.com/abisinchan/legendary-doodle/assets/132783183/2acc1bf2-2a6d-4b93-b41f-302bc8edfd69)  
npm run seed  
![2](https://github.com/abisinchan/legendary-doodle/assets/132783183/8e2bcbf6-9bf3-4458-9708-692737e0e715)  
Insomnia Delete  
![3](https://github.com/abisinchan/legendary-doodle/assets/132783183/cf3e5191-2a21-4b00-9a1e-2cf009267e38)  
Insomnia Put  
![4](https://github.com/abisinchan/legendary-doodle/assets/132783183/410c0647-82be-42a2-8687-e32cf33aef94)  
Insomnia Post  
![5](https://github.com/abisinchan/legendary-doodle/assets/132783183/7392cd6b-7793-443f-951a-1dabc143cbe6)  
Insomnia Get one by ID    
![6](https://github.com/abisinchan/legendary-doodle/assets/132783183/bc7cf072-4008-4154-bffb-ecbafb1f7032)  
Insomnia Get  
![7](https://github.com/abisinchan/legendary-doodle/assets/132783183/4a784ad4-e7d6-4c5e-a436-84ae8437def3)  


## Link to Demo
https://drive.google.com/file/d/1TtYscygLgR9t5uXRsj0r32E767qkCPF4/view?usp=sharing

## Credits
N/A

## License
MIT

## GitHub Repo
https://github.com/abisinchan



