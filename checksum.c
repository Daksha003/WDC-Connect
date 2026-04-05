#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Function to XOR two binary strings (sum before adding carry)
char* xorBinary(char* a, char* b) {
    int len = strlen(a); // Assume same length
    char* result = (char*)malloc(sizeof(char) * (len + 1));
    for (int i = 0; i < len; i++) {
        result[i] = ((a[i] - '0') ^ (b[i] - '0')) + '0';
    }
    result[len] = '\0';
    return result;
}

// Function to add two binary strings (sum after adding carry)
char* addBinary(char* a, char* b) {
    int len1 = strlen(a);
    int len2 = strlen(b);
    int carry = 0;
    int i = len1 - 1;
    int j = len2 - 1;
    char* result = (char*)malloc(sizeof(char) * (len1 > len2 ? len1 : len2) + 2);
    int k = 0;

    while (i >= 0 || j >= 0 || carry) {
        int sum = carry;
        if (i >= 0) sum += a[i--] - '0';
        if (j >= 0) sum += b[j--] - '0';
        result[k++] = (sum % 2) + '0';
        carry = sum / 2;
    }
    result[k] = '\0';

    // Reverse the result
    for (int p = 0; p < k / 2; p++) {
        char temp = result[p];
        result[p] = result[k - 1 - p];
        result[k - 1 - p] = temp;
    }

    return result;
}

// Function to get one's complement
char* onesComplement(char* bin) {
    int len = strlen(bin);
    char* comp = (char*)malloc(sizeof(char) * (len + 1));
    for (int i = 0; i < len; i++) {
        comp[i] = (bin[i] == '0') ? '1' : '0';
    }
    comp[len] = '\0';
    return comp;
}

int main() {
    char bin1[65], bin2[65];
    printf("Enter first binary string: ");
    scanf("%s", bin1);
    printf("Enter second binary string: ");
    scanf("%s", bin2);

    // Sum before adding carry (XOR)
    char* xor_sum = xorBinary(bin1, bin2);
    printf("Sum before adding carry: %s\n", xor_sum);

    // Sum after adding carry (full binary addition)
    char* full_sum = addBinary(bin1, bin2);
    printf("Sum after adding carry: %s\n", full_sum);

    // Compute one's complement of the full sum
    char* checksum = onesComplement(full_sum);
    printf("Checksum (one's complement): %s\n", checksum);

    free(xor_sum);
    free(full_sum);
    free(checksum);

    return 0;
}
