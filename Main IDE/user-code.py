
import sys
sys.stdin = open('input.txt', 'r')
sys.stdout = open('output.txt', 'w')
# Start Coding

arr = input().split(" ").map(int(e))

arr.sort()

print(arr)
    