# Documentação Técnica - Pokédex App

### Estrutura

```
src/
├── app/
│   ├── pages/           # Páginas da aplicação
│   │   ├── details/     # Página de detalhes do Pokémon
│   │   ├── favorites/   # Página de Pokémon favoritos
│   │   └── home/        # Página inicial com lista de Pokémon
│   ├── components/      # Componentes reutilizáveis
│   │   └── pokemon-image/ # Componente para exibir imagem do Pokémon
│   ├── services/        # Serviços para lógica de negócios
│   │   ├── pokeapi/     # Serviço para comunicação com a PokeAPI
│   │   ├── favorites/   # Serviço para gerenciar favoritos
│   │   └── toast/       # Serviço para exibir notificações toast
│   ├── app.component.ts # Componente raiz da aplicação
│   └── app.routes.ts    # Configuração de rotas
```

## Componentes

#### PokemonImage

- **Funcionalidade**: Exibe a imagem de um Pokémon a partir do seu ID.
- **Implementação**: Utiliza a URL padrão de imagens da PokeAPI para exibir a imagem do Pokémon.

### Páginas

#### Home Page

- **Funcionalidade**: Exibe uma lista paginada de Pokémon com rolagem infinita.
- **Interações**:
    - Utiliza o `PokeapiService` para carregar a lista de Pokémon
    - Permite navegação para a página de detalhes ao clicar em um Pokémon
    - Permite navegação para a página de favoritos através do botão de favoritos

#### Details Page

- **Funcionalidade**: Exibe informações detalhadas sobre um Pokémon específico.
- **Interações**:
    - Utiliza o `PokeapiService` para carregar detalhes do Pokémon
    - Permite adicionar/remover o Pokémon dos favoritos usando o `FavoritesService`
    - Exibe informações como tipos, habilidades, estatísticas, altura e peso e imagens

#### Favorites Page

- **Funcionalidade**: Exibe a lista de Pokémon favoritos do usuário.
- **Interações**:
    - Utiliza o `FavoritesService` para obter a lista de favoritos
    - Permite navegação para a página de detalhes ao clicar em um Pokémon
    - Permite remover Pokémon dos favoritos

### Serviços

#### PokeapiService

- **Funcionalidade**: Gerencia a comunicação com a PokeAPI.
- **Métodos Principais**:
    - `getAll(limit: number, offset: number)`: Obtém uma lista paginada de Pokémon
    - `getById(id: number)`: Obtém detalhes de um Pokémon específico por ID

#### FavoritesService

- **Funcionalidade**: Gerencia a lista de Pokémon favoritos do usuário.
- **Métodos Principais**:
    - `isFavorite`: Verifica se um Pokémon está na lista de favoritos
    - `toggleFavorite`: Adiciona ou remove um Pokémon da lista de favoritos e exibe uma notificação
    - `load()`: Carrega a lista de favoritos do localStorage

#### ToastService

- **Funcionalidade**: Gerencia a exibição de notificações toast na aplicação utilizando o `ToastController` do Ionic.
- **Métodos Principais**:
    - `show`: Exibe uma notificação toast com a mensagem e cor especificadas
