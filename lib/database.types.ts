export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string;
          title: string;
          created: string;
          updated: string;
        };
        Insert: {
          id?: string;
          title?: string;
          created?: string;
          updated?: string;
        };
        Update: {
          id?: string;
          title?: string;
          created?: string;
          updated?: string;
        };
      };
    };
    Functions: {};
  };
}

