package com.uppercase;

public class MoveUppercaseToEnd {

	public static void main(String[] args) {
		public static void main(String[] args) {
	        Scanner sc = new Scanner(System.in);
	        
	        // Read the full line (including spaces)
	        String text = sc.nextLine();
	        
	        StringBuilder lowerPart = new StringBuilder();
	        StringBuilder upperPart = new StringBuilder();
	        
	        // Separate uppercase and other characters
	        for (int i = 0; i < text.length(); i++) {
	            char ch = text.charAt(i);
	            if (Character.isUpperCase(ch)) {
	                upperPart.append(ch);
	            } else {
	                lowerPart.append(ch);
	            }
	        }
	        
	        // Combine them
	        String result = lowerPart.toString() + upperPart.toString();
	        
	        // Print result
	        System.out.println(result);
	        
	        sc.close();


	}

}
