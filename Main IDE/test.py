def xor(a, b):
    result = []
    for i in range(1, len(b)):
        if(a[i] == b[i]):
            result.append('0')
        else:
            result.append('1')

    return ''.join(result)

def mod(divident,divisor):
    l=len(divisor)
    m=len(divident)
    t=divident[0 : l]
    while(l<m):
        if(t[0]=='1'):
            t=xor(divisor,t)+divident[l]
        else:
            t=xor('0'*l,t)+divident[l]
        l+=1
    if(t[0]=='1'):
        t=xor(divisor,t)
    else:
        t=xor('0'*l,t)
    cw=t
    return cw

data="1010101"
key="1101"
n=len(key)
a=data+'0'*(n-1)
remainder = mod(a, key)
code = data + remainder
print("Remainder : "+remainder)
print("Encoded Data : "+code)
reciever= mod(code, key)
print("Reciever side check:"+reciever)
