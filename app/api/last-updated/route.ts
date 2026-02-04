import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Get the last commit date in ISO format
    const { stdout } = await execAsync('git log -1 --format=%cd --date=iso');
    const commitDate = stdout.trim();

    // Parse and format the date
    const date = new Date(commitDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return Response.json({
      date: formattedDate,
      timestamp: date.toISOString()
    });
  } catch (error) {
    console.error('Failed to get last commit date:', error);
    // Return current date as fallback
    const now = new Date();
    return Response.json({
      date: now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      timestamp: now.toISOString()
    });
  }
}
