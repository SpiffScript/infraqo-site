import React, { useEffect, useState } from "react";

const SCRIPTS = [
  `switch-01# configure terminal
switch-01(config)# interface vlan 10
switch-01(config-if)# ip address 10.10.10.11 255.255.255.0
switch-01(config-if)# description Office LAN
switch-01(config-if)# exit
switch-01(config)# ip default-gateway 10.10.10.1
switch-01(config)# dns server 1.1.1.1 9.9.9.9
switch-01(config)# end
switch-01# write memory`,

  `fw-edge-01# set interface wan0 ip 192.168.50.2/29
fw-edge-01# set interface lan0 ip 10.20.0.1/24
fw-edge-01# set vlan 20 name "Guest Wi-Fi"
fw-edge-01# set vlan 30 name "Cameras"
fw-edge-01# set dhcp lan0 pool 10.20.0.50-10.20.0.200
fw-edge-01# set dns forwarder 1.1.1.1
fw-edge-01# commit
fw-edge-01# save`,

  `nvr-01> netconfig
nvr-01(net)# ip 10.30.40.15
nvr-01(net)# mask 255.255.255.0
nvr-01(net)# gateway 10.30.40.1
nvr-01(net)# dns1 1.1.1.1
nvr-01(net)# dns2 8.8.8.8
nvr-01(net)# ntp time.nist.gov
nvr-01(net)# apply
nvr-01(net)# exit`
];

const TYPING_SPEED = 28; // ms per character
const END_PAUSE = 1800;  // pause before starting next script

const ConfigSimulation: React.FC = () => {
  const [scriptIndex, setScriptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const current = SCRIPTS[scriptIndex];

    // finished this script – pause, then move to the next one
    if (charIndex >= current.length) {
      const pause = setTimeout(() => {
        setCharIndex(0);
        setDisplayed("");
        setScriptIndex((prev) => (prev + 1) % SCRIPTS.length);
      }, END_PAUSE);

      return () => clearTimeout(pause);
    }

    // type next character
    const timeout = setTimeout(() => {
      setDisplayed(current.slice(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    }, TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [charIndex, scriptIndex]);

  return (
    <aside
      className="config-panel"
      aria-hidden="true"
    >
      <div className="config-panel__header">
        <span className="config-panel__title">Configuration in progress</span>
        <span className="config-panel__status">Simulated</span>
      </div>

      <div className="config-panel__body">
        <pre className="config-panel__code">
          {displayed}
          <span className="config-panel__cursor" />
        </pre>
        <p className="config-panel__hint">
          Sample switch, firewall, and NVR settings. Real projects get this
          level of detail – just without the drama.
        </p>
      </div>
    </aside>
  );
};

export default ConfigSimulation;
