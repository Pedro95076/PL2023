import re

def change(b):
    possible = [200,100,50,20,10,5,2,1]
    res = "maq: \"troco= "
    for i in possible:
        if b >= i:
            n = b//i
            b %= i
            if n > 0:  
                coin = i//100
                c = 'e'
                if i not in possible[:2]:
                    coin = i%100
                    c = 'c'

                res += f'{n}x{coin}{c}, '
    res += 'Volte sempre!'
    res = res.replace(', V','; V')
    print(res)


def handle_coins(s, b):
    total = 0
    invalid = []
    coins = re.split(r', ', s)
    for coin in coins:
        if re.match(r'[125]0?c', coin):
            total += int(coin[:-1]) 
        elif re.match(r'[12]e', coin):
            total += int(coin[:-1])*100
        else:
            invalid.append(coin)
    res = "maq: \""
    if len(invalid) != 0:
        res += f"{invalid} - inválido; "
    res += f"saldo = {((b+total)//100)}e{((b+total)%100):02d}c\""
    print(res)
    return b+total


def handle_phone_number(n, b):
    cost = 0
    if (len(n) == 9 and re.match(r'601|641', n) == None) or (len(n) == 11 and n[:2] == '00'):
        if re.match(r'00', n):
            cost = 150
        elif re.match(r'2',n):
            cost = 25
        elif re.match(r'808',n):
            cost = 10
        if cost <= b:
            b -= cost
            print(f"saldo = {((b)//100)}e{((b)%100):02d}c\"")
        else:
            print("maq: \"Saldo inválido!\"")
    else:
        print("maq: \"Esse número não é permitido neste telefone. Queira discar novo número!\"")
    return b
    
    
balance = 0
state = ""
while state != "LEVANTAR":
    state = input()
    
print("maq: \"Introduza moedas.\"")

while state != "ABORTAR" and state != "POUSAR":
    state = input()
    if state[0] == 'M':
        balance = handle_coins(re.sub(r'MOEDA ','',state), balance)
    elif state[0] == 'T':
        balance = handle_phone_number(re.sub(r'T=','',state), balance)
        
change(balance)