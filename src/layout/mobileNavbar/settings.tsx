// custom hooks
import { useTheme } from '@/providers/themeProvider';

// subcomponents
import Toggle from '@/subcomponents/toggle';

// icons
import { IoBrush } from 'react-icons/io5';

// styles
import classes from './mobileNavbar.module.scss';

const Settings = () => {
  const { colorScheme, setColorScheme } = useTheme();

  return (
    <div className={classes.settingsSection}>
      <div className={classes.secTitle}>
        <IoBrush />
        <p>Theme</p>
      </div>
      <div className={classes.secGroup}>
        <p>Dark mode</p>
        <Toggle
          defaultChecked={colorScheme === 'dark'}
          onChange={() => setColorScheme()}
        />
      </div>
    </div>
  );
};

export default Settings;
