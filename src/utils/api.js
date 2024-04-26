export async function fetchActors(page = 1) {
  let retries = 3;
  while (retries > 0) {
    try {
      console.log(`Fetching actors for page ${page}, retries left: ${retries}`);
      const response = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching actors:', error);
      retries--;
    }
  }
  throw new Error('Max retries exceeded, unable to fetch actors');
}

export async function fetchActorById(id) {
  let retries = 3;
  while (retries > 0) {
    try {
      console.log(`Fetching actor with ID ${id}, retries left: ${retries}`);
      const response = await fetch(`https://swapi.py4e.com/api/people/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching actor:', error);
      retries--;
    }
  }
  throw new Error('Max retries exceeded, unable to fetch actor by ID');
}

export async function fetchFilmById(id) {
  let retries = 3;
  while (retries > 0) {
    try {
      console.log(`Fetching film with ID ${id}, retries left: ${retries}`);
      const response = await fetch(id);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching film:', error);
      retries--;
    }
  }
  throw new Error('Max retries exceeded, unable to fetch film by ID');
}
