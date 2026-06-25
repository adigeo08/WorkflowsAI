import { landingPuckConfig, defaultLandingPuckData } from './landingConfig';
import { PuckEditorShell } from './PuckEditorShell';
import { landingPuckStorageKey } from './puckStorage';

export function LandingPuckEditor() {
  return <PuckEditorShell title="AI Operations Landing" eyebrow="Puck Landing Builder" storageKey={landingPuckStorageKey} config={landingPuckConfig} fallbackData={defaultLandingPuckData} />;
}
