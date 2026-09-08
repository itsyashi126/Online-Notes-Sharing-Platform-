public class practice {

    public static void main(String[] args) {

        System.out.println("This program is running from Practice.java");

        // Calling parent constructors using child class
        Child obj1 = new Child();
        Child obj2 = new Child(10);
        Child obj3 = new Child(20, "Java");
    }
}

// Parent class
class Parent {

    Parent() {
        System.out.println("Parent Default Constructor");
    }

    Parent(int a) {
        System.out.println("Parent Constructor with one parameter: " + a);
    }

    Parent(int a, String b) {
        System.out.println("Parent Constructor with two parameters: " + a + " and " + b);
    }
}

// Child class
class Child extends Parent {

    Child() {
        super();   // calls Parent()
        System.out.println("Child Default Constructor");
    }

    Child(int x) {
        super(x);  // calls Parent(int)
        System.out.println("Child Constructor with one parameter: " + x);
    }

    Child(int x, String y) {
        super(x, y);  // calls Parent(int, String)
        System.out.println("Child Constructor with two parameters: " + x + " and " + y);
    }
}
