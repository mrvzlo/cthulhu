import RuleInterface from '@/data-layer/rules/rules.interface';
import list from '@/data-layer/rules/rules.json';

export default class RuleService {
   nextRoute(id: number): string {
      return this.getById(++id)?.route ?? '';
   }

   previousRoute(id: number): string {
      return this.getById(--id)?.route ?? '';
   }

   getAll(filtered: RuleInterface[] = list): RuleInterface[] {
      return Object.assign({}, ...filtered.map((x: RuleInterface) => ({ [x.id]: x })));
   }

   getByRoute(route: string): RuleInterface | null {
      const found = list.filter((x) => x.route === route);
      return found ? found[0] : null;
   }

   getById(id: number): RuleInterface | null {
      const found = list.filter((x) => x.id === id);
      return found ? found[0] : null;
   }
}
