package com.assingment1;

public class Main {

	public static void main(String[] args) {
			
			// Create a TicketBooking object
	        TicketBooking booking = new TicketBooking("Music Show", "Sakshi", 2);
	        
	        // Print receipt
	        booking.printReceipt();

	        // Make a cash payment
	        booking.makePayment(1500.00);

	        // Make a wallet payment
	        booking.makePayment("WAL123456", 1500.00);

	        // Make a credit card payment
	        booking.makePayment("1234-5678-9012-3456", "789", "Sakshi", 1500.00);

	}

}
