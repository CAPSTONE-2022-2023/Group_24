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

In the 2nd page, user will enter their guest details such as full name, contact information, and number of guests. The page will also feature additional room requests options for guest with special demands for their hotel room during their stay. At the bottom of the page will contain the sum ups of the reversation details as well as grand total price along with a button that will takes the user to another page that will take the user's payment information to complete the reservation.

### Employee's Hotel Room Modification System

### Reversation Viewing Tool

~### Client Account Features
The client can browse from a list of available hotel rooms once they login. There will be filters and a search bar to sort the list of hotel rooms. These include sorting by price range, room type, and recommended amount of guests. Clients can also expand a chosen hotel room to view additonal information and to book the room. Once a room is booked, it will be viewable on their profile and the client can choose to edit or cancel the reservation. Client won't be able to cancel reservation 24hrs before the reservation time.~

~### Hotel Employee Account Features
The hotel employee can view a list of hotel rooms that are listed. They can choose to create additional hotel rooms which will take them to another page to input the information regarding the room, such as available time slots, included amenities, images, and recommended amount of guests. They will also be able to edit any existing hotel rooms and can choose to delete them. Once a room is booked, its status will be updated to reflect that and the employee can view it within the page that shows all reserved rooms as well as information on the guests.~

### Payment System
The hotel will ultized the third party payment system (Visa, Paypal, etc...) which will allow the hotel employee to register the hotel on third party system and they will take care of the payments.
