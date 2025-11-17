import Link from 'next/link';
import MarsLogo from '@/assets/icons/mars-logo.svg';
import LinkdInLogo from '@/assets/icons/linkedIn.svg';
import FacebookLogo from '@/assets/icons/facebook.svg';
import styles from './Footer.module.scss';
import cx from 'classnames';
 
const navigation = [
	{
		title: 'About Us',
		url: '/about',
	},
	{
		title: 'Solutions',
		url: "/solutions",
	},
	{
		title: 'Geomatics & RS',
		url: "/services/geomatics-and-remote-sensing",
	},
	 
]

const contactInfo = {
	email: "info@marsrobotic.com",
	phone: "+962 27102026",
	fax: "+962 27102044",
	address: "Wasfi Al Tal Street, P.O Box 2233, Irbid 21163, Jordan",
}

const Footer = ({ className }) => {
	return (
		<footer className={cx(styles.container, className)}>
			<div className={styles.footer}>
				<div className={styles.navigationFooter}>
					<MarsLogo className={styles.logo} alt="Mars Icon" />
					<div className={styles.navigation}>
						{navigation.map((item, index) => (
							<Link key={index} href={item.url} className={styles.navigationItem}>
								{item.title}
							</Link>
						))}
					</div>
					<div className={styles.socialBlock}>
						<a href="https://www.linkedin.com/company/mars-robotics" target='_blank'>
							<LinkdInLogo className={styles.socialIcon} alt="LinkedIn Icon" />
						</a>
						<a href="https://web.facebook.com/marsroboticc" target='_blank'>
							<FacebookLogo className={styles.socialIcon} alt="Facebook Icon" />
						</a>
					</div>
				</div>
				<div className={styles.contactSection}>
					<span className={styles.contactLabel}>Contact:</span>
					{Object.keys(contactInfo).map((key, index) => (
						<div key={index} className={styles.contactItems}>
							<span className={styles.contactKey}>{key}: </span>
							<span className={styles.contactValue}>{contactInfo[key]}</span>
						</div>
					))}
				</div>
				<div className={styles.socialBlockSmalScreen}>
					<LinkdInLogo className={styles.socialIcon} alt="LinkedIn Icon" />
					<FacebookLogo className={styles.socialIcon} alt="Facebook Icon" />
				</div>
				<div className={styles.copyRight}>
					<div className={styles.copyRightText}>
						<span>
							MARSROBOTICS© {new Date().getFullYear()}. All Rights Reserved.
						</span>
						<Link href="/privacypage">
							Privacy Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
