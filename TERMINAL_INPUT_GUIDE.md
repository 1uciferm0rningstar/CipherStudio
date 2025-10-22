# 🖥️ Terminal Input Guide

## Interactive Terminal for All Languages

The CipherStudio Code Editor now features a **real terminal interface** where you type input directly in the terminal - just like a real console!

---

## 📝 How It Works

### For Programs with `input()`, `scanf()`, `cin`, etc.

#### **Step 1: Write Your Code**
```python
a = input("First number: ")
b = input("Second number: ")
res = float(a) + float(b)
print(res)
```

#### **Step 2: Click "Run"**
The terminal will detect that your program needs input and show:
```
📝 Input Required: This program needs input.
Type your input values in the terminal below (one per line) and press Enter.
When done entering all inputs, click Run again.
```

#### **Step 3: Type Your Inputs in Terminal**
Look at the bottom of the terminal - you'll see:
```
> _
```

Type your first value and press **Enter**:
```
> 10
```

Then type your second value and press **Enter**:
```
> 10
> 20
```

#### **Step 4: Click "Run" Again**
Now click the Run button again. The program will execute with your inputs:
```
▶ Running app.py...
First number: Second number: 30.0
```

---

## 🎯 Complete Example

### Python Example:
```python
name = input("Enter your name: ")
age = input("Enter your age: ")
print(f"Hello {name}, you are {age} years old!")
```

### Terminal Interaction:
1. **Click Run** → Terminal shows "Input Required"
2. **Type in terminal:**
   ```
   > Alice
   > 25
   ```
3. **Click Run again** → Output:
   ```
   ▶ Running script.py...
   Enter your name: Enter your age: Hello Alice, you are 25 years old!
   ```

---

## 🌐 Works With All Languages

### Python
```python
x = input("Enter number: ")
print(f"You entered: {x}")
```

### C
```c
#include <stdio.h>
int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("Sum: %d\n", a + b);
    return 0;
}
```
**Terminal input:** `10 20` (space-separated on one line)

### C++
```cpp
#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << "Sum: " << a + b << endl;
    return 0;
}
```
**Terminal input:** `10 20`

### Java
```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        int age = sc.nextInt();
        System.out.println("Hello " + name + ", age " + age);
    }
}
```
**Terminal input:**
```
> Alice
> 25
```

---

## 💡 Tips

### Multiple Inputs
For programs with multiple `input()` calls:
1. Click Run
2. Enter first value, press Enter
3. Enter second value, press Enter
4. Continue for all inputs
5. Click Run again

### Single Line vs Multiple Lines
- **Python `input()`**: Each value on a new line
- **C `scanf("%d %d")`**: Values on same line, space-separated
- **Java `Scanner.nextLine()`**: Each value on a new line

### Clear Terminal
- Click the trash icon (🗑️) to clear the terminal
- Clears both output and pending inputs

### How to Tell When Input is Done
- After typing all your inputs (each followed by Enter)
- Click the "Run" button again
- The program will execute with all your inputs

---

## 🔧 Technical Details

### How Input is Captured
1. Terminal detects input functions in your code
2. You type values directly in the terminal input field at the bottom
3. Each Enter key press captures one input
4. All inputs are collected in a list
5. When you click Run again, inputs are sent to the program

### Input Field Location
The input field is at the **bottom of the terminal**:
```
┌─────────────────────────────────┐
│ TERMINAL                    🗑️ ✖️│
├─────────────────────────────────┤
│ Welcome to CipherStudio         │
│ > Ready to execute code         │
│                                 │
│ ▶ Running app.py...            │
│ Output appears here...          │
├─────────────────────────────────┤
│ > █ Type here and press Enter  │  ← INPUT HERE
└─────────────────────────────────┘
```

### Supported Input Functions
- ✅ Python: `input()`
- ✅ C: `scanf()`, `gets()`
- ✅ C++: `cin >>`
- ✅ Java: `Scanner.nextLine()`, `nextInt()`, etc.
- ✅ Ruby: `gets`, `readline`
- ✅ Go: `fmt.Scan()`, `fmt.Scanln()`
- ✅ PHP: `fgets(STDIN)`

---

## 🎮 Quick Workflow

```
1. Write code with input() ✍️
   ↓
2. Click "Run" 🏃
   ↓
3. See "Input Required" message 📝
   ↓
4. Type first value in terminal ⌨️
   ↓
5. Press Enter ↵
   ↓
6. Type second value ⌨️
   ↓
7. Press Enter ↵
   ↓
8. Click "Run" again 🏃
   ↓
9. See output! ✨
```

---

## ❓ Troubleshooting

### Q: I don't see the input field
**A:** It's at the very bottom of the terminal. Look for `> _` with a blinking cursor.

### Q: Nothing happens after typing
**A:** Make sure to:
1. Press **Enter** after each input
2. Click **Run** again after entering all inputs

### Q: Wrong output
**A:** Check:
- Did you enter the right number of inputs?
- Did you press Enter after each input?
- Are inputs in the correct order?

### Q: How do I start over?
**A:** Click the trash icon (🗑️) to clear the terminal and start fresh.

---

**Happy Coding! 🚀**
