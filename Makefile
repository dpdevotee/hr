start_local_db:
	docker-compose -f local_hr/docker-compose.db.yml up --build -d

stop_local_db:
	docker-compose -f local_hr/docker-compose.db.yml stop

deploy-back:
	gcloud run deploy hr

deploy-front:
	cd hr-ui && npm run build
	cp hr-ui/build/index.html hr-ui/cloud_run
	gsutil cp -r hr-ui/build gs://hr-static/
	gsutil acl -r ch -u AllUsers:R gs://hr-static/build/*
	cd hr-ui/cloud_run && gcloud run deploy hr-front

GOOGLE_APPLICATION_CREDENTIALS ?= $(shell bash -c 'read -p "Path to google credentials JSON: " creds; echo $$creds')

collectstatic:
	GOOGLE_APPLICATION_CREDENTIALS=$(GOOGLE_APPLICATION_CREDENTIALS) \
		python manage.py collectstatic
