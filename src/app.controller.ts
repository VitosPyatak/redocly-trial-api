import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus(): { status: string; uptime: number } {
    const statuses = ['ok', 'degraded', 'maintenance'];
    return {
      status: statuses[Math.floor(Math.random() * statuses.length)],
      uptime: Math.floor(Math.random() * 100000),
    };
  }

  @Get('users')
  getUsers(@Query('count') count?: string): { id: number; name: string }[] {
    const names = ['Alice', 'Bob', 'Charlie', 'Dana', 'Eve'];
    const total = count
      ? Math.max(1, parseInt(count, 10))
      : Math.floor(Math.random() * 5) + 1;
    return Array.from({ length: total }, (_, i) => ({
      id: i + 1,
      name: names[Math.floor(Math.random() * names.length)],
    }));
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string): { id: number; name: string } {
    const names = ['Alice', 'Bob', 'Charlie', 'Dana', 'Eve'];
    return {
      id: parseInt(id, 10),
      name: names[Math.floor(Math.random() * names.length)],
    };
  }

  @Get('weather')
  getWeather(@Query('city') city?: string): {
    city: string;
    temperature: number;
    condition: string;
  } {
    const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
    return {
      city: city ?? 'Unknown',
      temperature: Math.floor(Math.random() * 40) - 5,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
    };
  }

  @Get('quote')
  getQuote(@Query('author') author?: string): { author: string; text: string } {
    const quotes = [
      {
        author: 'Ada Lovelace',
        text: 'The Analytical Engine weaves algebraic patterns.',
      },
      {
        author: 'Alan Turing',
        text: 'We can only see a short distance ahead.',
      },
      {
        author: 'Grace Hopper',
        text: "It's easier to ask forgiveness than permission.",
      },
    ];
    const filtered = author
      ? quotes.filter((quote) =>
          quote.author.toLowerCase().includes(author.toLowerCase()),
        )
      : quotes;
    const pool = filtered.length > 0 ? filtered : quotes;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  @Get('joke')
  getJoke(): { setup: string; punchline: string } {
    const jokes = [
      {
        setup: 'Why do programmers prefer dark mode?',
        punchline: 'Because light attracts bugs.',
      },
      {
        setup: 'Why did the developer go broke?',
        punchline: 'Because they used up all their cache.',
      },
      {
        setup: 'How many programmers does it take to change a light bulb?',
        punchline: "None, that's a hardware problem.",
      },
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  @Get('metrics')
  getMetrics(): { cpu: number; memory: number; requests: number } {
    return {
      cpu: Math.round(Math.random() * 100 * 100) / 100,
      memory: Math.round(Math.random() * 100 * 100) / 100,
      requests: Math.floor(Math.random() * 10000),
    };
  }
}
