import re

class Person:
    def __init__(self, idade, sexo, tensao, colesterol, batimento, tem_doenca):
        self.idade = int(idade)
        self.sexo = sexo
        self.tensao = int(tensao)
        self.colesterol = int(colesterol)
        self.batimento = int(batimento)
        self.temDoenca = tem_doenca


def readParaMemoria():
    file = open("myheart.csv", "r")
    for i in range(1):
        file, next(file)

    lista = []

    for linha in file:
        z = re.match(r'(\w+),([MF]),(\d+),(\d+),(\d+),([01])', linha)
        (idade, sexo, tensao, colesterol, batimento, temDoenca) = z.groups()
        new_person = Person(idade, sexo, tensao, colesterol, batimento, temDoenca)
        lista.append(new_person)

    file.close()
    return lista


def doencaPorSexo(lista):
    m_com_doenca = 0
    f_com_doenca = 0
    for person in lista:
        if person.sexo == 'M' and person.temDoenca == '1':
            m_com_doenca += 1
        elif person.sexo == 'F' and person.temDoenca == '1':
            f_com_doenca += 1
            
    # Criação da tabela
    print("\n\n")
    print("+------+---------+")
    print("| Sexo | Doenças |")
    print("+------+---------+")
    print("| M    | {:>7} |".format(m_com_doenca))
    print("| F    | {:>7} |".format(f_com_doenca))
    print("+------+---------+")

def escaloes_etarios(lista):
    i30_34 = 0
    i35_39 = 0
    i40_44 = 0
    i45_49 = 0
    i50_54 = 0
    i55_59 = 0
    i60_64 = 0
    i65_69 = 0
    i70_74 = 0
    i75_79 = 0

    for person in lista:
        idade = int(person.idade)
        if 30 <= idade <= 34:
            i30_34 += 1
        elif 35 <= idade <= 39:
            i35_39 += 1
        elif 40 <= idade <= 44:
            i40_44 += 1
        elif 45 <= idade <= 49:
            i45_49 += 1
        elif 50 <= idade <= 54:
            i50_54 += 1
        elif 55 <= idade <= 59:
            i55_59 += 1
        elif 60 <= idade <= 64:
            i60_64 += 1
        elif 65 <= idade <= 69:
            i65_69 += 1
        elif 70 <= idade <= 74:
            i70_74 += 1
        elif 75 <= idade <= 79:
            i75_79 += 1
    
     # Criação da tabela
    print("\n\n")
    print("+--------------+------------+")
    print("| Faixa etária | Quantidade |")
    print("+--------------+------------+")
    print("| {:<12} | {:>10} |".format("30-34", i30_34))
    print("| {:<12} | {:>10} |".format("35-39", i35_39))
    print("| {:<12} | {:>10} |".format("40-44", i40_44))
    print("| {:<12} | {:>10} |".format("45-49", i45_49))
    print("| {:<12} | {:>10} |".format("50-54", i50_54))
    print("| {:<12} | {:>10} |".format("55-59", i55_59))
    print("| {:<12} | {:>10} |".format("60-64", i60_64))
    print("| {:<12} | {:>10} |".format("65-69", i65_69))
    print("| {:<12} | {:>10} |".format("70-74", i70_74))
    print("| {:<12} | {:>10} |".format("75-79", i75_79))
    print("+--------------+------------+")

def doenca_por_colesterol(lista):
    dict = {}
    colesterol_lista = [person.colesterol for person in lista if person.temDoenca]
    valor_min_col = min(colesterol_lista)
    valor_max_col = max(colesterol_lista)

    x = range(valor_min_col, valor_max_col, 10)
    lista_colesterol = []
    for col in x:
        lista_colesterol.append(col)

    for colesterol in lista_colesterol:
        for person in lista:
            if (colesterol <= person.colesterol < colesterol + 10) and \
                    (str(colesterol) + " - " + str(colesterol + 9)) not in dict:
                dict[str(colesterol) + " - " + str(colesterol + 9)] = 1
            elif colesterol <= person.colesterol <= colesterol + 9:
                dict[str(colesterol) + " - " + str(colesterol + 9)] += 1
                
    # Criação da tabela
    print("\n\n")
    print("+----------------------+------------+")
    print("| Níveis de Colesterol | Quantidade |")
    print("+----------------------+------------+")
    for chave, valor in dict.items():
        print("| {:<20} | {:>10} |".format(chave, valor))
    print("+----------------------+------------+")
    print("\n\n")
    
    
    

lista_main = readParaMemoria()
doencaPorSexo(lista_main)
escaloes_etarios(lista_main)
doenca_por_colesterol(lista_main)