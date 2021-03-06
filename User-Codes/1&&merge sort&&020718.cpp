/**
 * @author Amogh Pradeep
 * @email amogh.pradeep049@nmims.edu.in
 * @create date 2021-09-08 13:41:05
 * @modify date 2021-09-08 13:41:05
 */
#include <bits/stdc++.h>

using namespace std;

void merge(vector<int> &array, int l, int mid, int r){
    vector<int> mergedArray(r - l + 1);
    int i = l, j = mid, k = 0;
    while(i < mid and j <= r){
        if (array[i] <= array[j]){
            mergedArray[k ++] = array[i ++];
        }
        else{
            mergedArray[k ++] = array[j ++];
        }
    }

    for (; i < mid; ++i){
        mergedArray[k ++] = array[i];
    }
    for (; j <= r; ++j){
        mergedArray[k ++] = array[j];
    }

    for (k = l; k <= r; ++k){
        array[k] = mergedArray[k - l];
    }
}

void mergeSort(vector<int>& array, int l, int r){
    if (l >= r)
        return;

    int mid = (l + r)/2;
    mergeSort(array, l, mid);
    mergeSort(array, mid + 1, r);
    merge(array, l, mid + 1, r);
}

int main(){
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; ++i)
        cin >> a[i];

    mergeSort(a, 0, n - 1);

    cout << "Sorted Array is ->\n";
    for (int i = 0; i < n; ++i)
        cout << a[i] << " ";

    return 0;
}