import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1 id="title">rachile®</h1>
		<nav>
			<Link activeClassName={style.active} href="/">[h]ome</Link>
			<Link activeClassName={style.active} href="/profile">[n]et</Link>
			<Link activeClassName={style.active} href="/profile/john">[m]yself</Link> {/* customize with username*/}
			<Link activeClassName={style.active} href="/profile/login">[l]ogin</Link>
		</nav>
	</header>
);

export default Header;
