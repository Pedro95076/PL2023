import sys

def main():
    soma = 0
    on = True

    for linha in sys.stdin:
        linha = linha.strip()
        if linha.lower() == 'off':
            on = False
        elif linha.lower() == 'on':
            on = True
        else:
            for palavra in linha.split():
                if palavra.isdigit() and on:
                    soma += int(palavra)
            if "=" in linha:
                print(soma)
                soma = 0

if __name__ == '__main__':
    main()
