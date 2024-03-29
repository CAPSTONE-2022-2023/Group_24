# Group_24

## Members
| Name                 | Github      | Email                       |
| -------------------- | ----------- | --------------------------- |
| Quan Pham            | Pun-slinger | qpham4@myseneca.ca          |
| Ajaipal Singh Sangha | assangha    | assangha2@myseneca.ca       |
| Ivan Huang           | rtv4box     | hbhuang2@myseneca.ca        |

## Project Description
The purpose of this project is to develop a room booking website for a hotel. The two types of users are hotel clients and hotel employees, there will be different functionalities based on the type of user that logs in. The key features for clients are to create, edit, and cancel a hotel reservation, as well as browsing available hotel rooms based on their preference and making a payment through the website. The hotel employees can create, edit, and delete a hotel room. These functionalities will be further explained below:

### User Account System
The website will allow both clients and hotel employees to register and login with their accounts. An account will contain important information such as type, full name, email, and password. 
For employees it will ask employee id so that only employees can edit rooms and other clients reservations. Once the user creates an account, it will be saved to the database. The user can choose to edit information about their account at any time through their profile page.

### Hotel Room Showcase
This page will showcase the site vistor a list of available hotel room with photo along with its name. To assist the user in choosing their desired room, the hotel list will include filters, and sorting functionality by price range, room type, and recommended amount of guest. Once the site vistor decide to take a look at a specific room, they can select the chosen room on the list and will be taken to another page contain more informations about the selected room including prices, amount of guest recommended, commodities, additional photos, descriptions, and a button taking the user to the booking page. 

### Room Booking Tool
A feature available for both clients and hotel employee once they are loged in. The room booking tool allows users to begin making reversation upon selecting the booking button on the hotel room showcase page. User on this page will select their arrival and departure date in which then the system will checked for availability. If desired room is available, user will be taken to a 2nd page.

In the 2nd page, user will enter their guest details such as full name, contact information, and number of guests. The page will also feature additional room requests options for guest with special demands for their hotel room during their stay. At the bottom of the page will contain the sum ups of the reversation details as well as grand total price along with a button that will takes the user to another page that will take the user's payment information to complete the reservation. It will give them reservation number upon completion.

### Employee's Hotel Room Modification System
As a hotel employee, the user have the ability to modify, manipulating and delete existing room as well as add new rooms to the system. To assist employees in such task, the Hotel Room Modification System will be included in the website. 

When the user chose to create addiational hotel room, the employee home page will take them to another page to input the information regarding the room, such as available time slots, included amenities, images, and recommended amount of guests. 

If an existing room's information needs to be editted, the user can access its editting page from either the room page itself with an edit button that will appears after logging in or simply select from the employee homepage.

Similar to modifying the room, the delete fuctionality can also be used from the room page or the employee homepage.

### Reversation Viewing & Editing Tool

When user is logged in, they can use this tool to view their current reservation. For employee, they will be entering client's reservation number which will be assigned to them upon successfull reservation. From there user can select edit to change their reservation. They will be asked same info which was asked while making reservation. They will also get cancel option to cancel their reservation but they won't be able to cancel the reservation if it less than 24hrs from the reservation date and time. 

### Payment System
The hotel will ultized the third party payment system (Visa, Paypal, etc...) which will allow the hotel employee to register the hotel on third party system and they will take care of the payments.
