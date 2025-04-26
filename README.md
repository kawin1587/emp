![image](https://github.com/user-attachments/assets/6c3afe7c-f20b-4e73-8bc1-42a7846f76fe)![image](https://github.com/user-attachments/assets/6c78c5ce-bd3c-455e-8ce2-b8ed5aac8e4c)Full Stack App Deployed on AWS using Spring Boot Backend, React Frontend, and AWS RDS MySQL Database

EC2 Instance — RDS — Route53 Setup

![image](https://github.com/user-attachments/assets/476d78e9-8d17-49f3-90f6-c8cb163b3c43)

**Overview:**

1.Create RDS MySQL Database

2.Connect MySQL Workbench to RDS MySQL

3.Set up Prod Server (Spring Boot backend + React frontend)

4.Configure Backend App

5.Configure Frontend App

6.Set up Nginx for frontend and backend

7.Create Records in AWS Route 53

8.Secure App using Certbot (HTTPS)

9.Reconfigure EmployeeService.js to reflect HTTPS changes

![image](https://github.com/user-attachments/assets/25bb31df-1455-433f-b8bb-0cde70e37b8d)

**STEP 1 : Access the AWS Management Console**

1.	Open your web browser and go to the AWS Management Console: https://aws.amazon.com/console/.
2.	Sign in using your AWS account credentials.

**STEP 2 : Open the Amazon RDS console.**

1.	In the search bar, type “RDS” and click “Amazon RDS” from the search results.
2.	This will open the Amazon RDS console.
3.	Create a standard create method with Minimum configurations.

![image](https://github.com/user-attachments/assets/6aae8ed9-2c85-4933-b1b6-9bb2480a4f7e)

**STEP 3 : Open MYSQL workbench and test connection and connect to your Database.**

1.	Go to AWS RDS > EC2 > Security Groups > Inbound Rules > Add 3306.
2.	Go to MySql Workbench > click add > connection name > hostname=rds_endpoint  
     ---provide username(admin) and password > test connection.

![image](https://github.com/user-attachments/assets/f5864421-d054-49ab-a713-d097a3b5a119)

**STEP 4 : Set up Prod Server to serve Spring Boot backend and React frontend:**

1. Launch instance in Ubuntu AMI
2. Security group for Ec2-instance

**security_group : INBOUND RULES**

* SSH - PORT NUMBER - 22
* HTTP - PORT NUMBER - 80
* HTTPS - PORT NUMBER - 443
* CUSTOM TCP - PORT NUMBER - 8080
* CUSTOP TCP - PORT NUMBER - 3000

3.Connect the instance with CMD or Putty/MobaXterm
4. Create a NON-ROOT user
Create a non root user :
 ❖ sudo–I
 ❖ adduser spring
 ❖ usermod-aG sudo spring
 ❖ su-spring

![image](https://github.com/user-attachments/assets/b93687dd-9dfb-46cc-bcfb-41024439165b)

5.Run bash shell script to Install

#Run bash shell script to Install: 

- Java 17 and Maven for spring-backend, 
- Nodesjs for front-end, 
- Nginx, 
- Cerbot:

# Create a new file in VIM or NANO to run the script file

vim prod.sh

-----------------

#!/bin/bash
sudo apt-get update 

#Install Java 17
sudo apt install openjdk-17-jdk openjdk-17-jre -y 
#Install Maven
sudo apt install maven -y

#Install Nodejs
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash - &&\
sudo apt-get install -y nodejs 

#Install and configure Nginx
sudo apt install nginx -y
sudo ufw enable
sudo ufw allow 'Nginx Full'   #(port 80 and potentially 443 for HTTPS)
sudo ufw allow 8080 #(for the Spring backend).
sudo ufw allow 3000
sudo ufw allow 22    #allow incoming traffic on SSH
 
#Install and configure Cerbot
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
#Link the certbot command from the snap install directory to our path, so you can run it by just running certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

--------------------------

bash prod.sh

6. Check Installations

![image](https://github.com/user-attachments/assets/5d569d56-1183-4292-a2c6-2c77bcde7177)

**STEP 5 : Configure Backend App**

1. Clone source code from the git Repo : git clone  https://github.com/kawin1587/emp.git

![image](https://github.com/user-attachments/assets/3d8204eb-9050-4032-b489-a59ef4e3b028)

2. Build the JAR (Java ARchive) file

#build and install Maven projects
cd emp/employeemanagmentbackend
mvn clean install -DskipTests

![image](https://github.com/user-attachments/assets/ff32cff7-edb7-4e9f-b118-6e0d4efb0575)

3. Connect Backend APP to RDS
cd src/main/resources/
vim application.properties
(update spring.datasource.url=jdbc:mysql://paste_rds_endpoint_here/db_name, update username and password)

![image](https://github.com/user-attachments/assets/fcd228be-65c8-44a7-b2b4-107294fc903d)

4. ReBuild and Install Maven Projects and Run the Backend App

#Rebuild and install Maven projects
cd ../../../
mvn clean install -DskipTests

#RUN Backend-app
cd target/
ls
java -jar employee................-SNAPSHOT.jar

![image](https://github.com/user-attachments/assets/cb6ecbb3-b323-401e-983e-6acfd9a24081)

**STEP 6 : Access Backend-App on Browser — — — — — — — IP_FULL_STACK_SERVER:8080/employee — — — — — — —**

**STEP 7 : Configure Frontend-App**

1. Open another terminal and SSH to the full_stack_server
2. Connect backend-app to frontend

# Connect backend-app to frontend
cd emp/employeemanagement-frontend
cd src/service
vim EmployeeService.js

update BASE_URL = "http://IP_Full_Stack_Server:8080/employee";

3. BUILD and RUN Frontend App
#BUILD FrontEnd APP
cd ../../
npm install
npm install --save-dev @babel/plugin-proposal-private-property-in-object

#Run FrontEnd APP
npm start

![image](https://github.com/user-attachments/assets/262aa7ef-a313-4800-9349-f5e67c1fae94)

![image](https://github.com/user-attachments/assets/b27a8f51-153f-43a9-ae0c-7130165bdb22)

**STEP 8: Access Frontend-App on Browser— — — — — — — IP_FULL_STACK_SERVER:3000 — — — — — — — — — —**

>>>> Add Employee >>>> Give some Entries >>>>

![image](https://github.com/user-attachments/assets/d82bd679-71f5-4f4c-aa08-d53c8929ed4c)

**STEP 9 : Go To MySql Workbench and Run Some SQL Commands :**

On employeedb database and employee table :
select * from employee
select email from employee

![image](https://github.com/user-attachments/assets/7d557807-8bb8-41f4-a203-5a87d6c9aa4f)

**STEP 10 : Run the backend-app in background using systemd**

 >>>Update jar file path and User
sudo vim /etc/systemd/system/spring.service

------------------------

[Unit]
Description=Spring init sample
After=syslog.target
[Service]
User= spring
Restart=always
RestartSec=30s
ExecStart=/usr/bin/java -jar /home/spring/emp/employeemanagmentbackend/target/employeemanagmentbackend-0.0.1-SNAPSHOT.jar SuccessExitStatus=143
[Install]
WantedBy=multi-user.target

---------------------

sudo systemctl enable spring.service
sudo systemctl start spring.service
sudo systemctl status spring.service

#sudo systemctl stop spring.service
#sudo systemctl restart spring.service

![image](https://github.com/user-attachments/assets/64774593-8307-42a4-aeef-4b06cd59dbb2)

![image](https://github.com/user-attachments/assets/7ece0a2c-345b-4be3-ab88-348d6fa66909)

**STEP 11 : Setting up nginx to serve frontend application and proxying requests to both the frontend application and backend Spring application**

#Already Install and configure NGinx in script prod.sh
>>> Access Nginx on Browser : IP_Full_Stack_Server

#Generate static files that can be served by nginx.(asset-manifest.json index.html static/)
cd emp/employeemanagement-frontend
npm run build
ls

#Prepare nginx to serve the frontend app:
#Create a directory /var/www/front to host your frontend files we just generated.
cd /var/www 
sudo mkdir front
cd
cd emp/employeemanagement-frontend/build

sudo cp -r asset-manifest.json index.html static/ /var/www/front

#Create nginx server block for backend app and frontend app:

cd /etc/nginx/sites-available
#create a new server block configuration file (e.g., spring) for Full-stack-app
sudo vim spring

1 : New server block configuration file
![image](https://github.com/user-attachments/assets/09b89c57-cabc-4b14-a3e6-b21cb2fc7ca9)

sudo nginx -t

#Create a symlink to enable the newly created server block.
sudo ln -s /etc/nginx/sites-available/spring /etc/nginx/sites-enabled/spring

#Restart nginx to apply the configuration changes.
sudo systemctl restart nginx

2 : Prepare nginx to serve the frontend app

![image](https://github.com/user-attachments/assets/3e4809ef-7a7f-4d1a-bfd8-627d10174d77)

**STEP 12 : Create Hosted zone (A Record) in AWS Route 53 :**
![image](https://github.com/user-attachments/assets/388427da-5e08-4546-a5c6-09bf2244cb4b)

STEP 1 : Create Record in AWS Route 53
create record > hostname :  front > direct to :IP_Full_Stack_Server
create record > hostname :  back > direct to :IP_Full_Stack_Server
STEP 2 : Change NS(Name servers) from you domain provider

![image](https://github.com/user-attachments/assets/bda9be9b-44fe-466a-a434-13cb8734a8ed)

STEP 3 : Go on browser with check the access in the web-browsers
— back.kawinweb.xyz /employee and front.kawinweb.xyz

**STEP 13 : Secure Full-Stack-App using Cerbot**

#Already Install and configure Cerbot in script prod.sh

#Obtain SSL Certificate

sudo certbot --nginx -d back.kawinweb.xyz -d front.kawinweb.xyz 

>>>Enter requested informations like your email and accept terms and conditions etc

>>>Nginx configuration will now automatically redirect all web requests to https://.

![image](https://github.com/user-attachments/assets/7329bb9b-307c-4c5c-bc47-1ac954a9ec20)

**STEP 14 : Verify with Backend and Frontend websites**

#BACKEND
![image](https://github.com/user-attachments/assets/b9e4c0f6-5dfc-46ce-9f00-6141475b93ab)
#FRONTEND
![image](https://github.com/user-attachments/assets/3cde6ae5-7f88-4398-a18d-1de807eb4981)

**STEP 15 : Reconfigure your EmployeeService.JS File to reflect latest changes 
(server is now secure with https)**

#Update backend BASE_URL = "https://back.kawinweb.xyz/employee";
sudo vim emp/employeemanagement-frontend/src/service/EmployeeService.js

#Build and Copy frontend files again for Nginx to serve them on DNS this time
cd emp/employeemanagement-frontend
npm run build
cd /build
sudo cp -r asset-manifest.json index.html static/ /var/www/front

>>> Frontend data is comming back

![image](https://github.com/user-attachments/assets/e42d70b6-b503-4158-9e96-79c2c8df9073)

________________________________________________________________________________________________
