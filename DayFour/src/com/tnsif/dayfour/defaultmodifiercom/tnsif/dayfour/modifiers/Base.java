package com.tnsif.dayfour.defaultmodifiercom.tnsif.dayfour.modifiers;

class DefaultClass
{
	
}

public class Base {

	
		private int varPrivate=10;
		int varDefault= 20;
		protected int varProtected=30;
			
		
		// Declaring Method as Private, default, protected, public

		private void methodPrivate()
		{
			System.out.println("Private access Base class");
			System.out.println("Private Variable : "+ varPrivate);
		}
		
		 void methodDefault()
		{
			System.out.println("Default access Base Class");
			System.out.println("Default Variable : "+ varDefault);
		}
		
		 protected void methodProtected()
		 {
			 System.out.println("Protected access Base class");
			 System.out.println("Protected Variable : "+ varProtected);
		 }
		

//		Base() {
//			System.out.println();
//		}

		public static void main(String[] args)
		{
			Base b = new Base();
			
			b.methodPrivate();
			
			
		}
		
		// private class
		
		private class Data
		{

	}

}
