BackEnd-Commands
* On command prompt, cd into your project folder (cd <Your-Project-folder>).

* To build your project use command:
	mvn clean package -Dmaven.test.skip

* To launch your application, move into the target folder (cd target). Run the following command to run the application:

	java -jar <your application jar file name>

* Default credentials for MySQL:
	Username: root
	Password: pass@word1

* To login to mysql instance: Open new terminal and use following command:
      a.	sudo systemctl enable mysql
      b.	sudo systemctl start mysql
      NOTE: After typing any of the above commands you might encounter any warnings.
      --> Please note that these warnings are expected and can be disregarded. Proceed to the next step.
      c.	mysql -u root -p
The last command will ask for password which is ‘pass@word1’

* Mandatory: Before final submission run the following command: 
	mvn test

* To ensure your code is saved and available for later use, remember to use the CTRL+Shift+B command on your code IDE.
   This will push or save the updated contents in the internal git/repository.
   It is also important to use CTRL+Shift+B before the final submission to evaluate the code quality.


FrontEnd-Commands
* You can follow series of command to setup React environment once you are in your project-name folder:

* On command prompt, cd into your project folder (cd <Your-Project-folder>).

* npm install -> Will install all dependencies -> takes 10 to 15 min

* npm run start -> To compile and deploy the project in browser. You can press <Ctrl> key while clicking on localhost:8081 to open project in browser -> takes 2 to 3 min

* npm run jest -> to run all test cases and see the summary

* npm run test -> to run all test cases. It is mandatory to run this command before submission of workspace -> takes 5 to 6 min

* You need to use CTRL+Shift+B - command compulsorily on code IDE, before final submission as well. This will push or save the updated contents in the internal git/repository, and will be used to evaluate the code quality.
