# Comment interagir avec l'API ?

Vous devez utiliser le endpoint `http://localhost:3333/api` afin de pouvoir communiquer avec l'API.

!> N'oubliez pas d'ajouter votre `Authorization` dans les `headers` de vos requêtes et d'ajouter `Bearer` devant votre clé API. Si vous ne faites pas ceci, vous ne pourrez pas utiliser cette API.

```javascript
{
	Authorization: 'Bearer VOTRE_CLE_API',
}
```

# Todos

Veuillez noter que toutes les routes présentes ci-dessous sont accessibles seulement en ayant une clé API valide. Si vous ne savez pas comment récupérer la vôtre, veuillez vous référer à la section [Récupérer sa clé API](/#récupérer-sa-clé-api).

- **Endpoint final :** `http://localhost:3333/api/{ENDPOINT}`
- **Exemple :** `http://localhost:3333/api/todos/3`

### Ajouter une nouvelle todo

<table class="api">
	<thead>
		<tr>
			<th width="12.5%" class="text-align-center">METHOD</th>
			<th width="12.5%" class="text-align-center">ENDPOINT</th>
			<th width="35%" class="text-align-center">PARAM</th>
			<th width="40%" class="text-align-center">BODY</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="text-align-center">POST</td>
			<td class="text-align-center">/todos</td>
			<td class="text-align-center">Aucun</td>
			<td>
				<ul style="list-style: none; padding: 0px;">
					<li>
						<span style="color: lightgrey">[string]</span>
						<span style="color: red">text</span>
						: nom de la tâche
					</li>
					<li>
						<span style="color: lightgrey">[boolean]</span>
						completed : si la tâche est terminée ou non
					</li>
					<li>
						<span style="color: lightgrey">[string]</span>
						cat : catégorie de la tâche
					</li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>

### Récupérer les todos

<table class="api">
	<thead>
		<tr>
			<th width="12.5%" class="text-align-center">METHOD</th>
			<th width="12.5%" class="text-align-center">ENDPOINT</th>
			<th width="35%" class="text-align-center">PARAM</th>
			<th width="40%" class="text-align-center">BODY</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="text-align-center">GET</td>
			<td class="text-align-center">/todos</td>
			<td class="text-align-center">Aucun</td>
			<td class="text-align-center">Aucun</td>
		</tr>
	</tbody>
</table>

### Récupérer une todo

<table class="api">
	<thead>
		<tr>
			<th width="12.5%" class="text-align-center">METHOD</th>
			<th width="12.5%" class="text-align-center">ENDPOINT</th>
			<th width="35%" class="text-align-center">PARAM</th>
			<th width="40%" class="text-align-center">BODY</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="text-align-center">GET</td>
			<td class="text-align-center">/todos/<span style="font-weight: bold;">:id</span></td>
			<td>
				<span style="color: lightgrey">[number]</span>
				<span style="color: red">id</span>
				: l'identifiant de la todo
			</td>
			<td class="text-align-center">Aucun</td>
		</tr>
	</tbody>
</table>

### Mettre à jour une todo

<table class="api">
	<thead>
		<tr>
			<th width="12.5%" class="text-align-center">METHOD</th>
			<th width="12.5%" class="text-align-center">ENDPOINT</th>
			<th width="35%" class="text-align-center">PARAM</th>
			<th width="40%" class="text-align-center">BODY</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="text-align-center">PUT</td>
			<td class="text-align-center">/todos/<span style="font-weight: bold;">:id</span></td>
			<td>
				<span style="color: lightgrey">[number]</span>
				<span style="color: red">id</span>
				: L'identifiant de la todo
			</td>
			<td>
				<ul style="list-style: none; padding: 0px;">
					<li>
						<span style="color: lightgrey">[string]</span>
						text
						: nom de la tâche
					</li>
					<li>
						<span style="color: lightgrey">[boolean]</span>
						completed : si la tâche est terminée ou non
					</li>
					<li>
						<span style="color: lightgrey">[string]</span>
						cat : catégorie de la tâche
					</li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>

### Supprimer une todo

<table class="api">
	<thead>
		<tr>
			<th width="12.5%" class="text-align-center">METHOD</th>
			<th width="12.5%" class="text-align-center">ENDPOINT</th>
			<th width="35%" class="text-align-center">PARAM</th>
			<th width="40%" class="text-align-center">BODY</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="text-align-center">DELETE</td>
			<td class="text-align-center">/todos/<span style="font-weight: bold;">:id</span></td>
			<td>
				<span style="color: lightgrey">[number]</span>
				<span style="color: red">id</span>
				: l'identifiant de la todo
			</td>
			<td class="text-align-center">Aucun</td>
		</tr>
	</tbody>
</table>