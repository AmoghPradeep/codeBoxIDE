#include <bits/stdc++.h>
using namespace std;
int main(){
	// sort given array.
	
	// enter array size.
	int n;
	cin >> n;
	
	// enter array.
	vector<int> a(n);
	for (int i = 0; i < n; ++i){
	   cin >> a[i];
	}
	
	sort(a.begin(), a.end());
	cout << "sorted array : \n";
	for (int i = 0; i < n; ++i){
	    cout << a[i] << " ";
	}
	
	return 0;
}        