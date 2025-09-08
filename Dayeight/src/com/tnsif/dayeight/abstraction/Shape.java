package com.tnsif.dayeight.abstraction;

public  abstract class Shape {

	public static void main(String[] args) {
		protected float area;
		
		// abstract method
		abstract void calArea();
		
		// concrete method
		 void show()
		{
			System.out.println("Area of shape is "+ area);
		}

	}

}
