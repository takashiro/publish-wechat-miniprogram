const cp = require('child_process');

function exec(command) {
	cp.execSync(command, {
		stdio: 'inherit',
		cwd: __dirname,
	});
}

exec('npm ci');
exec('npm run build');
