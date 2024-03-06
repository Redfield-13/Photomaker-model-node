 import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

// Main Class
export class Photomaker implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Photo Maker',
		name: 'Photomaker',
		icon: 'file:exchangeRate.svg',
		group: ['input'],
		version: 1,
		description: 'Create photos, paintings and avatars for anyone in any style within seconds.',
		defaults: {
			name: 'Photomaker',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [],
		properties: [
			{
				displayName: 'Image Url',
				name: 'imageUrl',
				type: 'string',
				noDataExpression: true,
				default: '',
				displayOptions: {},
			},
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				noDataExpression: true,
				default: '',
				displayOptions: {},
			},
			{
				displayName: 'Negative Prompt',
				name: 'Negprompt',
				type: 'string',
				noDataExpression: true,
				default: '',
				displayOptions: {},
			},
			{
				displayName: 'Style Name',
				name: 'style_name',
				type: 'options',
				noDataExpression: true,
				options: [
          {
						name: '(No Style)',
						value: '(No style)',
						action: 'Subscribers',
					},
					{
						name: 'Cinematic',
						value: 'Cinematic',
						action: 'Subscribers',
					},
					{
						name: 'Comic book',
						value: 'Comic book',
						action: 'Subscribers',
					},
					{
						name: 'Digital Art',
						value: 'Digital Art',
						action: 'Campaigns',
					},
					{
						name: 'Disney Chractor',
						value: 'Disney Chractor',
						action: 'Campaigns',
					},
					{
						name: 'Enhance',
						value: 'Enhance',
						action: 'Campaigns',
					},
					{
						name: 'Fantasy art',
						value: 'Fantasy art',
						action: 'Campaigns',
					},
          {
						name: 'Line Art',
						value: 'Line art',
						action: 'Campaigns',
					},
					{
						name: 'Lowpoly',
						value: 'Lowpoly',
						action: 'Campaigns',
					},
					{
						name: 'Neopunk',
						value: 'Neonpunk',
						action: 'Campaigns',
					},
					{
						name: 'Photographic',
						value: 'Photographic (Default)',
						action: 'Campaigns',
					},
				],
				default: 'Photographic (Default)',
			},
			{
				displayName: 'Number of Steps',
				name: 'num_steps',
				type: 'number',
				noDataExpression: true,
				default: '50',
				displayOptions: {},
			},
			{
				displayName: 'Style Strength Ratio',
				name: 'style_ratio',
				type: 'number',
				noDataExpression: true,
				default: '20',
				displayOptions: {},
			},
			{
				displayName: 'Number of Output Images',
				name: 'num_output',
				type: 'number',
				noDataExpression: true,
				default: '1',
				displayOptions: {},
			},
			{
				displayName: 'Guidance Scale',
				name: 'guide',
				type: 'number',
				noDataExpression: true,
				default: '5',
				displayOptions: {},
			},
			{
				displayName: 'Seed',
				name: 'seed',
				type: 'number',
				noDataExpression: true,
				default: '1',
				displayOptions: {},
			},
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const length = items.length as number;
		const responseData: IDataObject[] = [];

		for (let i = 0; i < length; i++) {
			const imageUrl = this.getNodeParameter('imageUrl', i) as string;
			const prompt = this.getNodeParameter('prompt', i) as string;
			const Negprompt = this.getNodeParameter('Negprompt', i) as string;
			const seed = this.getNodeParameter('seed', i) as number;
			const guide = this.getNodeParameter('guide', i) as number;
			const num_output = this.getNodeParameter('num_output', i) as number;
			const style_ratio = this.getNodeParameter('style_ratio', i) as number;
			const num_steps = this.getNodeParameter('num_steps', i) as number;
			const style_name = this.getNodeParameter('style_name', i) as string;

			let Url = `http://127.0.0.1:8000/photomaker?url=${imageUrl}&prompt=${prompt}&negprompt=${Negprompt}&style_name=${style_name}&num_steps=${num_steps}&style_ratio=${style_ratio}&num_output=${num_output}&guide=${guide}&seed=${seed}`;
			let response = await this.helpers.request({ method: 'GET', url: Url, json: true });
			let trace = response;
			responseData.push({ Url, trace });
		}

		return this.prepareOutputData(responseData.map((item) => ({ json: item })));
	}
}