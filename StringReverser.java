import java.util.Scanner;

public class StringReverser {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user for input
        System.out.print("Enter a string: ");
        String input = scanner.nextLine();

        // Reverse the string using StringBuilder
        StringBuilder reversed = new StringBuilder(input);
        System.out.println("Reversed string: " + reversed.reverse().toString());

        scanner.close();
    }
}
