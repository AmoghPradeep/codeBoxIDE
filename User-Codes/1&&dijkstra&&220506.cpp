/**
 * @author Amogh Pradeep
 * @email amogh.pradeep049@nmims.edu.in
 * @create date 2021-09-02 23:27:37
 * @modify date 2021-09-03 18:01:07
 */

#include <bits/stdc++.h>
#include <set>

#define infinite INT_MAX

using namespace std;

// * dijkstra on adjacency list.
vector<int> dijkstraAdjList(int source, vector<vector<pair<int, int>>> graph){
    int vertexCount = graph.size();

    vector<int> distance(vertexCount + 1, infinite);
    distance[source] = 0;

    // * stores vertices in ascending order, sorted with respect to distance from source.
    set<pair<int ,int>> vertexSet;

    // * adding source node, which is trivially at a distance 0.
    vertexSet.insert({0, source});

    while(!vertexSet.empty()){
        // * selected vertex at minimum distance from source.
        auto selectedVertex = *vertexSet.begin();

        int dist = selectedVertex.first;
        int vertexNumber = selectedVertex.second;

        // * relaxing all neighbors of the vertex.
        for (auto edge : graph[vertexNumber]){

            int neighbor = edge.first;
            int weight = edge.second;

            if (dist +  weight < distance[neighbor]){
                // * updating the distance of neighbor to new value.
                distance[neighbor] = dist + weight;
                vertexSet.insert({dist + weight, neighbor});
            }
        }

        // * erasing the selected vertex from set.
        vertexSet.erase(vertexSet.begin());
    }

    return distance;
}

int getVertexAtMinimumDistance(vector<bool> visited, vector<int> distance){
    int minDist = INT_MAX;
    int vertex = -1;
    
    for (int i = 1; i < distance.size(); ++i){
        if (visited[i] and distance[i] < minDist){
            minDist = distance[i];
            vertex = i;
        }
    }
    
    return vertex;
}


vector<int> dijkistraAdjMatrix(int source, vector<vector<int>> graph){
    int vertexCount = graph.size();
    
    // * distance array will store the distance of vertex from source.
    vector<int> distance(vertexCount + 1, infinite);
    distance[source] = 0;
    
    vector<bool> visited(vertexCount + 1, false);
    
    
    for (int i = 0; i < vertexCount; ++i){
        int minVertex = getVertexAtMinimumDistance(visited, distance);
        Output
        // * Iterating through all the neighbors of minVertex.
        
        for (int neighbor = 1; neighbor <= vertexCount; ++neighbor){
            
            // * there is no edge between these 2 vertices.
            if (graph[minVertex][neighbor] == infinite)
                continue;
                
            int newDist = distance[minVertex] + graph[minVertex][neighbor];
            if (newDist < distance[neighbor] and !visited[neighbor])
                visited[neighbor] = true, distance[neighbor] = newDist;
                
        }
    }
    
    return distances;
}

int main(){
    int n, e, s;

    cout << "Enter number of vertexes in graph : - \n";
    cin >> n;
    cout << "Enter number of edges in graph : - \n";
    cin >> e;
    cout << "Enter source node : -\n";
    cin >> s;

    vector<vector<pair<int, int>>> adjacencyList(n + 1);
    vector<vector<int>> adjacencyMatrix(n + 1, vector<int> (n + 1, infinite));

    cout << "Enter Edges : - \n";
    cout << "source node, destination node, edge weight \n";


    for (int i = 0; i < e; ++i){
        int source, dest, weight;
        cin >> source >> dest >> weight;

        adjacencyList[source].push_back({dest, weight});
        adjacencyMatrix[source][dest] = weight;
    }

    vector<int> answer1 = dijkstraAdjList(s, adjacencyList);
    vector<int> answer2 = dijkistraAdjMatrix(s, adjacencyMatrix);

    for (int i = 1; i <= n; ++i){
        cout << "Vertex " << i  << " is at a distance of " << answer1[i] << endl;
    }
}