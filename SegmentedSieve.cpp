#include<bits/stdc++.h>
#define ll long long
using namespace std;
long long N = 1000001;
vector<bool>primes(N, true);
void Gen_sieve() {
	primes[0] = false; primes[1] = false;
	for (int i = 2; i * i < N; i++) {
		if (primes[i]) {
			for (int j = i * i; j < N; j += i) {
				primes[j] = false;
			}
		}
	}
}
vector<int> PrimesUntillR(int R) {
	vector<int> firstPrimes;
	for(int i = 2; i * i <= R; i++)
		if(primes[i]) firstPrimes.push_back(i);
	return firstPrimes;
}

int main() {
	Gen_sieve();
	int q; cin >> q;
	while (q--) {
		ll L, R;
		cin >> L >> R;

		vector<int> firstPrimes = PrimesUntillR(R);
	
		// array to store the range
		vector<bool> mask(R - L + 1, true);

		for (auto prime : firstPrimes) {
			ll firstMultiple = ((L / prime) + (L % prime != 0)) * prime;
			
			for (ll i = firstMultiple; i <= R; i += prime) {
				mask[i - L] = false;
			}
		}

		for (int i = 0; i < mask.size(); i++) if (mask[i]) cout << L + i << " ";
	}
}

