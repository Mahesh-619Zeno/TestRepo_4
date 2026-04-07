def add(num1, num2): return num1 + num2


print("Select operation: 1.Add 2.Subtract 3.Multiply 4.Divide")
choice = input("Enter choice (1/2/3/4): ")
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

if choice == '1':
    print(f"Result: {add(num1, num2)}")
else:
    print("Invalid input")
