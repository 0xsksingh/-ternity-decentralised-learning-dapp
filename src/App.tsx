import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import React, { useEffect, useState } from 'react';

import './App.css';
import logo from './assets/logo.svg';
import loadingLogo from './assets/loading-logo.svg';
import useAeternitySDK from './hooks/useAeternitySDK';
import network from "./configs/network";

const App = () => {
	const { aeSdk, address, networkId, connectToWallet } = useAeternitySDK();
	const [balance, setBalance] = useState('loading...');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | undefined>();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			setMessage('Searching for Wallet ...');
			try {
				await connectToWallet();
				setMessage(undefined);
			} catch (error) {
				if (!(error instanceof Error)) throw error;
				setMessage(error.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [connectToWallet]);

	useEffect(() => {
		(async () => {
			if (networkId == null || address == null) return;

			if (networkId !== network.id) {
				setMessage(`Current network "${networkId}" is not supported. Please switch network in the wallet.`);
				return;
			}
			setMessage(undefined);
			
			const _balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
			setBalance(_balance);
		})();
	}, [aeSdk, networkId, address]);

	return (
		<div className="App">
			<header className="App-header">
				<div>
					<img src={isLoading ? loadingLogo : logo} alt="logo" />
					{message
						? <h6>{message}</h6>
						: <React.Fragment>
							<h6>Account: {address}</h6>
							<h6>Balance: {balance}</h6>
							<h6>Connected to wallet on network "{networkId}"</h6>
						</React.Fragment>
					}
				</div>
			</header>
		</div>
	);
};

export default App;
