# This is a MySQL evaluation repo for My Digital School, Paris

## Start

You have to setup your database (MySQL), and put the connection's options in the **config/config.js** file.
**eval_mysql_db_creationScript.sql** is a creation script for the database.
In the **export** folder, you will find data to populate de database.

*user email* : **test@dummy.com**
*admin email* : **admin@eval.com**
*password* : **test**

Once this is all done, type npm start in the terminal to start **both** the server and the client.
A new page will open in your browser.

## How to

You can click on an article to see the detailed view.
You can search article or user by key words.
On the Account menu (top), you can see your informations and all your comments (possibly update/delete)
 
As an admin, you can :

  *Create article
  
  *Update/delete your articles
  
  *Create user or admin account
  
  *Update/delete user account
  
  *Create/Read/Update user comments
 
There is a flash message system telling you if there is any bugs on the server side, or simply informing you.
