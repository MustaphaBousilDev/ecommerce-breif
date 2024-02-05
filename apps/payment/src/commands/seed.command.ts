// src/commands/seed.command.ts
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { runSeeders } from '../seeds/seed';

@Injectable()
export class SeedCommand {
  @Command({ command: 'seed:run', describe: 'Run seeds' })
  async run() {
    console.log('Seeding database...');
    await runSeeders();
    console.log('Seeding complete!');
  }
}
