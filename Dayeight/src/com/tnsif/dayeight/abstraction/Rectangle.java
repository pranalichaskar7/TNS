package com.tnsif.dayeight.abstraction;

public class Rectangle extends Shape {

	public static void main(String[] args) {
		private float width, height;
		
		public Rectangle() {
			this.width= 5.0f;
			this.height=2.0f;
		}

		public Rectangle(float width, float height) {
			super();
			this.width = width;
			this.height = height;
		}

		@Override
		void calArea() {
			area = width*height;
	}

}
