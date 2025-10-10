def is_palindrome(s):
    return s == s[::-1]

word = input("Enter a word: ")
print("Palindrome!" if is_palindrome(word) else "Not a palindrome.")
