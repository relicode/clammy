FROM public.ecr.aws/lambda/nodejs:16

ARG epel_key=https://dl.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-7
ARG epel_repo=https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

# COPY --chown=999:999 virus-database /var/lib/clamav

RUN rpm --import ${epel_key} && \
  yum upgrade -y && \
  yum install -y ${epel_repo} && \
  yum install -y clamav && \
  chown 999:999 /var/lib/clamav && \
  # if [ -e "${update_datebase}" ]; then freshclam; fi
  freshclam

# WORKDIR ${LAMBDA_TASK_ROOT}

# COPY app/dist ./dist
# COPY app/node_modules ./node_modules
# COPY app/package.json .

# CMD ["dist/index.handler"]
