package com.assingment1;

public class TicketBooking {

	public static void main(String[] args) {
		 private String stageEvent;
		    private String customer;
		    private Integer noOfSeats;

		    // Default constructor
		    public TicketBooking() {
		    }

		    // Parameterized constructor
		    public TicketBooking(String stageEvent, String customer, Integer noOfSeats) {
		        this.stageEvent = stageEvent;
		        this.customer = customer;
		        this.noOfSeats = noOfSeats;
		    }

		    // Getters and Setters
		    public String getStageEvent() {
		        return stageEvent;
		    }

		    public void setStageEvent(String stageEvent) {
		        this.stageEvent = stageEvent;
		    }

		    public String getCustomer() {
		        return customer;
		    }

		    public void setCustomer(String customer) {
		        this.customer = customer;
		    }

		    public Integer getNoOfSeats() {
		        return noOfSeats;
		    }

		    public void setNoOfSeats(Integer noOfSeats) {
		        this.noOfSeats = noOfSeats
		    }

		    // Overloaded makePayment methods

		    // 1. For cash payment
		    public void makePayment(Double amount) {
		        System.out.println("Payment Mode: Cash");
		        System.out.println("Amount: ₹" + amount);
		        System.out.println("Transaction successful.");
		    }

		    // 2. For wallet payment
		    public void makePayment(String walletNumber, Double amount) {
		        System.out.println("Payment Mode: Wallet");
		        System.out.println("Wallet Number: " + walletNumber);
		        System.out.println("Amount: ₹" + amount);
		        System.out.println("Transaction successful.");
		    }

		    // 3. For credit card payment
		    public void makePayment(String creditCard, String ccv, String name, Double amount) {
		        System.out.println("Payment Mode: Credit Card");
		        System.out.println("Card Number: " + creditCard);
		        System.out.println("CCV: " + ccv);
		        System.out.println("Card Holder: " + name);
		        System.out.println("Amount: ₹" + amount);
		        System.out.println("Transaction successful.");
		    }

		    // Optional: display booking details
		    public void printReceipt() {
		        System.out.println("\n--- Receipt ---");
		        System.out.println("Stage Event: " + stageEvent);
		        System.out.println("Customer: " + customer);
		        System.out.println("Number of Seats: " + noOfSeats);
		    }
		}

	}

}
