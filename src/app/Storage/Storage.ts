function waitResult(request: IDBRequest) {
  return new Promise((res, rej) => {
    request.onsuccess = res;
    request.onerror = rej;
  });
}
export interface User {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GameResult {
  user: User;
  score: number;
}

export interface GameStorage {
  getResults: () => Promise<GameResult[]>;
  saveResult: (result: GameResult) => Promise<void>;
}
function getTableName() {
  return 'score';
}
export class IdbStorage implements GameStorage {
  sortResults:
  | {
    user: {
      photo: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    score: number;
  }[]
  | undefined;

  constructor(private databaseName: string) {
    this.sortResults = undefined;
  }

  getSortResults(): {
    user: {
      photo: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    score: number;
  }[] {
    return this.sortResults as {
      user: {
        photo: string;
        firstName: string;
        lastName: string;
        email: string;
      };
      score: number;
    }[];
  }

  getResults(): Promise<GameResult[]> {
    const res: GameResult[] | undefined = this.sortResults;
    return this.performQuery<GameResult[]>(async (store) => {
      const request: IDBRequest = store.getAll();
      const scoresArr: number[] = [];
      await waitResult(request);
      return request.result;
    });
  }

  saveResult(result: GameResult): Promise<void> {
    return this.performQuery((store) => {
      store.add(result, result.score);
    });
  }

  private async performQuery<T>(
    executeQuery: (transaction: IDBObjectStore) => Promise<T> | T,
  ) {
    const connection = await this.connect();
    const database = connection.result;

    const tableName = getTableName();

    let result: T;
    try {
      const transaction = database.transaction(tableName, 'readwrite');
      const objectStore = transaction.objectStore(tableName);
      result = await executeQuery(objectStore);
      await new Promise((resolve, reject) => {
        transaction.oncomplete = resolve;
        transaction.onerror = reject;
      });
    } finally {
      database.close();
    }

    return result;
  }

  private async connect() {
    const connection = indexedDB.open(this.databaseName);
    connection.onupgradeneeded = () => {
      const tableName = getTableName();
      const database = connection.result;

      if (!database.objectStoreNames.contains(tableName)) {
        database.createObjectStore(tableName);
      }
    };
    await new Promise((resolve, reject) => {
      connection.onsuccess = resolve;
      connection.onerror = reject;
    });

    return connection;
  }
}
export const storage = new IdbStorage('poli8512');
