#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Function to perform XOR operation on two binary strings
char* xorBinary(char* a, char* b) {
    int len = strlen(a);
    char* result = (char*)malloc(sizeof(char) * (len + 1));
    for (int i = 0; i < len; i++) {
        result[i] = ((a[i] - '0') ^ (b[i] - '0')) + '0';
    }
    result[len] = '\0';
    return result;
}

// Function to perform CRC division
char* crcDivision(char* data, char* generator) {
    int dataLen = strlen(data);
    int genLen = strlen(generator);
    char* temp = (char*)malloc(sizeof(char) * (dataLen + genLen));
    strcpy(temp, data);

    // Append zeros to data
    for (int i = dataLen; i < dataLen + genLen - 1; i++) {
        temp[i] = '0';
    }
    temp[dataLen + genLen - 1] = '\0';

    // Perform division
    for (int i = 0; i <= dataLen; i++) {
        if (temp[i] == '1') {
            for (int j = 0; j < genLen; j++) {
                temp[i + j] = ((temp[i + j] - '0') ^ (generator[j] - '0')) + '0';
            }
        }
    }

    // Extract remainder
    char* remainder = (char*)malloc(sizeof(char) * (genLen));
    for (int i = 0; i < genLen - 1; i++) {
        remainder[i] = temp[dataLen + i];
    }
    remainder[genLen - 1] = '\0';

    free(temp);
    return remainder;
}

int main() {
    char data[65], generator[65];
    printf("Enter data (binary string): ");
    scanf("%s", data);
    printf("Enter generator polynomial (binary string): ");
    scanf("%s", generator);

    char* crc = crcDivision(data, generator);
    printf("CRC: %s\n", crc);

    // Data with CRC appended
    char* dataWithCrc = (char*)malloc(sizeof(char) * (strlen(data) + strlen(crc) + 1));
    strcpy(dataWithCrc, data);
    strcat(dataWithCrc, crc);
    printf("Data with CRC appended: %s\n", dataWithCrc);

    free(crc);
    free(dataWithCrc);

    return 0;
}
