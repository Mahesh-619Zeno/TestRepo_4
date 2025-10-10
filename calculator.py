def add(x, y): return x + y


print("Select operation: 1.Add 2.Subtract 3.Multiply 4.Divide")
choice = input("Enter choice (1/2/3/4): ")
x = float(input("Enter first number: "))
y = float(input("Enter second number: "))

if choice == '1':
    print(f"Result: {add(x, y)}")
else:
    print("Invalid input")
